import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/users`
        );
        const user = await response.json();
        setUsers(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="mt-10 ml-4">
      {/* Table */}

      <Table className="lg:w ">
        <Table.Head>
          <Table.HeadCell className="whitespace-nowrap">Name</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users
            .filter((user) => user.role !== "admin")
            .map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  <button
                    onClick={() => {
                      window.location.href = `/user/${user._id}`;
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src={`/images/${user.photo}`}
                        alt="user"
                        className="w-12 h-12 rounded-full cursor-pointer "
                        //onClick={() => window.location.replace(`/profile/${comment.user._id}`)}
                      />
                      <span className="ml-4 text-lg font-bold">
                        {user.name}
                      </span>
                    </div>
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserList;
