import UserList from "../components/UserList"

const User = () => {
  return (
    <div className=" md:px-80 pt-8">
<h3 className=" text-3xl">Users List</h3>
      <UserList admin={false} />
    </div>
  )
}

export default User