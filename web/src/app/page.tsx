import { fetchMsg, updateMsg } from "@/action/reqeust";

export default function Home() {
  // const queryClient = useQueryClient();

  // const { data: posts, error, isLoading } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchMsg,
  // });
  return (
    <>
    
      <div className="flex h-screen justify-center items-center">
        <div className="bg-white min-w-[40%] shadow-md rounded-lg p-4">
          <h4 className="text-2xl font-bold text-center">
            Smart Contract Blockchain
          </h4>
          <div className="mt-[30px] text-center">
            message: <span className="text-blue-500">Hello World</span>
          </div>
          <div className="mt-[30px] mb-5 flex flex-col h-full ">
            <label className="form-control w-full max-w-lg mx-auto">
              <span className="label-text">Message:</span>
              <input
                type="text"
                placeholder="Please enter the new message..."
                className="input input-bordered w-full max-w-lg"
              />
            </label>
            <div className="flex-grow"></div>
            <button className="btn btn-active btn-accent mt-10 mx-auto">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
