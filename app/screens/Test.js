handleAddPicture = () => {
  const { user } = data // wherever you user data is stored;
  const options = {
    title: 'Select Profile Pic',
    mediaType: 'photo',
    takePhotoButtonTitle: 'Take a Photo',
    maxWidth: 256,
    maxHeight: 256,
    allowsEditing: true,
    noData: true,
  }
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response)
    if (response.didCancel) {
      // do nothing
    } else if (response.error) {
      // alert error
    } else {
      const { uri } = response
      const extensionIndex = uri.lastIndexOf('.')
      const extension = uri.slice(extensionIndex + 1)
      const allowedExtensions = ['jpg', 'jpeg', 'png']
      const correspondingMime = ['image/jpeg', 'image/jpeg', 'image/png']

      const file = {
        uri,
        name: `${this.messageIdGenerator()}.${extension}`,
        type: correspondingMime[allowedExtensions.indexOf(extension)],
      }
      RNS3.put(file, options)
        .progress((event) => {
          console.log(`percent: ${event.percent}`)
        })
        .then((response) => {
          console.log(response, 'response from rns3')
          if (response.status !== 201) {
            alert('Something went wrong, and the profile pic was not uploaded.')
            console.error(response.body)
            return
          }
          const message = {}
          message._id = this.messageIdGenerator()
          message.createdAt = Date.now()
          message.user = {
            _id: user.userId,
            name: `${user.firstName} ${user.lastName}`,
            avatar: 'user avatar here',
          }
          message.image = response.headers.Location
          message.messageType = 'image'
          this.chatsFromFB.update({
            messages: [message, ...this.state.messages],
          })
        })
      if (!allowedExtensions.includes(extension)) {
        return alert('That file type is not allowed.')
      }
    }
  })
}
