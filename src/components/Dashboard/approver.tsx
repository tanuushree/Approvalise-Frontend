"use client"
import React, { useState, useEffect } from "react";
import ReviewCard from "@/components/CardApprover";
import ReviewCardOnClick from "@/components/CardApproverOnClick";
import { useUser } from "@/components/UserContext";

interface Review {
  _id: string;
  avatarText: string;
  title: string;
  subheader: string;
  createdAt: string;
  content: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  approvers: string;
  creatorId: string; // Add creatorId to Review interface
  creatorUsername: string; // Add creatorUsername to Review interface
}

const Approver: React.FC = () => {
  const { userId } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/approver/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      
      const updatedRequests = await Promise.all(
        data.map(async (req: any) => {
          // Fetch usernames for approverPath
  
          // Fetch username for creatorId
          try {
            const creatorResponse = await fetch(`http://localhost:5000/api/users/${req.creatorId}`);
            if (!creatorResponse.ok) {
              throw new Error("Failed to fetch creator details");
            }
            const creatorData = await creatorResponse.json();
            const creatorUsername = creatorData.username;

            const createdAtDate = new Date(req.createdAt);
            const formattedCreatedAt = createdAtDate.toISOString().split('T')[0];
  
            // Construct title with creator's username
            const title = `${req.title} `;
  
            // Construct description with usernames
            const approvers = await Promise.all(
              req.approverPath.map(async (approverId: string) => {
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
              })
            );
  
            return {
              ...req,
              title: title,
              approvers: approvers.join(", "),
              creatorUsername: creatorUsername, 
              createdAt: formattedCreatedAt,
            };
          } catch (error) {
            console.error("Error fetching creator details:", error);
            return {
              ...req,
              title: `${req.title} by Unknown User`,
              approvers: req.approverPath.join(", "),
              creatorUsername: "Unknown User",
              createdAt: req.createdAt,
            };
          }
        })
      );
  
      setReviews(updatedRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (userId) {
      fetchRequests(userId);
    }
  }, [userId]);

  const handleApprove = async (id: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/applications/${id}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === id ? { ...review, status: "approved" } : review
      )
    );
  };

  const handleReject = async (id: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/applications/${id}/reject`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === id ? { ...review, status: "rejected" } : review
      )
    );
  };

  const renderPendingReviews = () => {
    return reviews
      .filter((review) => review.status === "pending")
      .map((review) => (
        <ReviewCard
          key={review._id}
          avatarText={review.avatarText}
          title={review.creatorUsername}
          subheader={review.createdAt}
          content={review.title}
          description={review.description}
          status={review.status}
          onApprove={() => handleApprove(review._id)}
          onReject={() => handleReject(review._id)}
        />
      ));
  };

  const renderAcceptedRejectedReviews = (status: "approved" | "rejected") => {
    return reviews
      .filter((review) => review.status === status)
      .map((review) => (
        <ReviewCardOnClick
          key={review._id}
          avatarText={review.avatarText}
          title={review.creatorUsername}
          subheader={review.subheader}
          content={review.title}
          description={`${review.description}\n${review.approvers}`}
          status={review.status}
        />
      ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">
          Pending
        </h2>
        <div className="space-y-4 pt-2">{renderPendingReviews()}</div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">
          Accepted
        </h2>
        <div className="space-y-4 pt-2">{renderAcceptedRejectedReviews("approved")}</div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold w-60 mb-2 p-4 text-white bg-black text-center rounded-md">
          Rejected
        </h2>
        <div className="space-y-4 pt-2">{renderAcceptedRejectedReviews("rejected")}</div>
      </div>
    </div>
  );
};

export default Approver;
