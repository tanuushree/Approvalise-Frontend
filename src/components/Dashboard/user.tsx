'use client';
import React, { useState, useEffect } from "react";
import ReviewCard from "@/components/CardUser";
import { useUser } from "@/components/UserContext";

const User: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const { userId } = useUser();
  console.log(userId);

  useEffect(() => {
    if (userId) {
      fetchRequests(userId);
    }
  }, [userId]);

  const fetchRequests = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/user/${userId}`); 
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      console.log(data);
      // Process each request to fetch usernames for approverPath
      const updatedRequests = await Promise.all(data.map(async (req: any) => {
        // Fetch usernames for approverPath
        const resp = await fetch(`http://localhost:5000/api/applications/${req._id}/mapstatus`);
        const approversmap = await resp.json()
        console.log(approversmap)
        const usernames = await Promise.all(req.approverPath.map(async (approverId: string) => {
          try {
            const userResponse = await fetch(`http://localhost:5000/api/users/${approverId}`); 
            if (!userResponse.ok) {
              throw new Error("Failed to fetch user details");
            }
            const userData = await userResponse.json();
            return userData.username; // Assuming username is available in user data
          } catch (error) {
            console.error("Error fetching user details:", error);
            return "Unknown User";
          }
        }));
    
        
        return {
          ...req,
          approvers: approversmap,
        };
      }));
      
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Pending</h2> 
          <div className="space-y-4 pt-2">
            {requests.filter(req => req.status.toLowerCase()  === "pending").map(req => (
              <ReviewCard
                key={req._id}
                avatarText={req.creatorId.substring(0, 1)}
                title={req.title}
                subheader={new Date(req.createdAt).toLocaleDateString()}
                description={req.approvers} 
                content={req.description} 
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Accepted</h2> 
          <div className="space-y-4 pt-2">
            {requests.filter(req => req.status === "approved").map(req => (
              <ReviewCard
                key={req._id}
                avatarText={req.creatorId.substring(0, 1)}
                title={req.title}
                subheader={new Date(req.createdAt).toLocaleDateString()}
                description={req.approvers} 
                content={req.description}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">Rejected</h2> 
          <div className="space-y-4 pt-2">
            {requests.filter(req => req.status === "rejected").map(req => (
              <ReviewCard
                key={req._id}
                avatarText={req.creatorId.substring(0, 1)}
                title={req.title}
                subheader={new Date(req.createdAt).toLocaleDateString()}
                description={req.approvers} 
                content={req.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
