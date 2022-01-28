import { PrismaClient, User } from "@prisma/client";
import { useCallback } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix";

interface UserResponse {
  user: User | null;
}

export const loader: LoaderFunction = async (): Promise<UserResponse> => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst();
  await prisma.$disconnect();
  return { user };
};

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const action: ActionFunction = async ({ request }) => {
  console.log(request);
  await sleep(3000);
  return new Response(JSON.stringify({ ok: true }));
};

const Action = () => {
  const { user } = useLoaderData<UserResponse>();
  const fetcher = useFetcher();
  const transition = useTransition();

  const handleClick = useCallback(async () => {
    const response = await fetcher.submit(new FormData(), {
      method: "post",
    });
    console.log(response);
  }, [fetcher]);

  const disabled = transition.state !== "idle" || fetcher.state !== "idle";

  return (
    <div>
      {user?.id}
      <h2>With Form</h2>
      <Form method="post">
        <button disabled={disabled} type="submit">
          Submit
        </button>
      </Form>
      <h2>Without Form</h2>
      <button disabled={disabled} onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Action;
