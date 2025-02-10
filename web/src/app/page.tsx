"use client";

import { $api } from "@/libs/api";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const { data, isLoading, refetch } = $api.useQuery(
    "get",
    "/contracts/hello-world/"
  );
  const { mutateAsync, isPending } = $api.useMutation(
    "post",
    "/contracts/hello-world/"
  );

  return (
    <>
      <div className="flex h-screen justify-center items-center text-black">
        <div className="bg-white min-w-[40%] shadow-md rounded-lg p-4">
          <h4 className="text-2xl font-bold text-center">
            Smart Contract Blockchain
          </h4>
          <div className="mt-[30px] text-center">
            message:{" "}
            {isLoading && <span className="text-black/50">Loading...</span>}
            <span className="text-blue-500">{data?.message}</span>
          </div>
          <div className="mt-[30px] mb-5 flex flex-col h-full ">
            <label className="form-control w-full max-w-lg mx-auto">
              <span className="label-text">Message:</span>
              <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Please enter the new message..."
                className="input input-bordered w-full max-w-lg bg-white"
              />
            </label>
            <div className="flex-grow"></div>
            <button
              className="btn btn-active btn-accent mt-10 mx-auto"
              disabled={isPending}
              onClick={async () => {
                await mutateAsync({
                  body: {
                    message: message,
                  },
                });
                await refetch();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
