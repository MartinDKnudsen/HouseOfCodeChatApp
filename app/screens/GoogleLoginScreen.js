export const GetUser = async ({ input }) => {
  const currentUser = await GoogleSignin.getCurrentUser()
  console.log(currentUser + { input })
}
