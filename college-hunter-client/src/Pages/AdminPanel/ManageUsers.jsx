
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAdmin from '../../Hooks/useAdmin';

const ManageUsers = () => {
    // const [users, , refetch] = useUsers();
    const users = [];
    const [isAdmin, isAdminLoading] = useAdmin();
    // console.log('admin',isAdmin);

    const handleChangeRole = (user, role) => {
        // const token = localStorage.getItem('access-token');
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/users/role/?id=${user._id}&role=${role}`;
        fetch(url, {
            method: 'PATCH',
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an ${role} Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    // delete a user from mongo database
    const handleDeleteUser = (user) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleSwalConfirm(user);

            }
        })
    }

    const handleSwalConfirm = (user) => {
        const token = localStorage.getItem('access-token');
        const url = `https://sports-zone-server.vercel.app/users?id=${user._id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        `${user?.name} has been deleted!`,
                        'success'
                    )
                }
            })
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-8">Manage Users</h1>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name and Email</th>
                            <th>Role</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <img className='h-10 w-10 rounded-full' src={user?.photoURL} />
                                    </td>
                                    <td>
                                        <div>
                                            <p>
                                                {user?.name}
                                            </p>
                                            <p>
                                                {user?.email}
                                            </p>
                                        </div>
                                        
                                    </td>
                                    <th>
                                        {user?.role ? user.role : 'Student'}
                                    </th>

                                    <th>
                                        <div className='float-right flex items-center'>
                                            <p>Make</p>
                                            <>
                                                <button disabled={user?.role === 'admin' ? 'disabled' : ''} onClick={() => handleChangeRole(user, "admin")} className=' btn btn-primary mx-2 rounded-lg p-3'> Admin</button>
                                                <button disabled={user?.role === 'instructor' ? 'disabled' : ''} onClick={() => handleChangeRole(user, "instructor")} className=' btn btn-primary mx-2 rounded-lg p-3'> Instructor</button>


                                            </>
                                            {/* below code is much better : because here you can make admin/instructor/student any time. promote and demoting will be much better and easy.  */}
                                            {/* {user?.role === "admin" && <>
                                                <button onClick={() => handleChangeRole(user, "student")} className=' btn-primary  mx-2 rounded-lg p-3'> Student</button>
                                                <button onClick={() => handleChangeRole(user, "instructor")} className=' btn-primary  mx-2 rounded-lg p-3'> Instructor</button>
                                            </>}
                                            {user?.role === "instructor" && <>
                                                <button onClick={() => handleChangeRole(user, "admin")} className=' btn-primary  mx-2 rounded-lg p-3'> Admin</button>
                                                <button onClick={() => handleChangeRole(user, "student")} className=' btn-primary  mx-2 rounded-lg p-3'> Student</button>

                                            </>}
                                            { user?.role === "student" && <>
                                                <button onClick={() => handleChangeRole(user, "admin")} className=' btn-primary  mx-2 rounded-lg p-3'> Admin</button>
                                                <button onClick={() => handleChangeRole(user, "instructor")} className=' btn-primary  mx-2 rounded-lg p-3'> Instructor</button>
                                            </>} */}
                                            <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>

                                        </div>

                                    </th>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;