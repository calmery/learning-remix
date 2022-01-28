import { useCallback } from "react";
import { ActionFunction, Form, redirect, useFetcher } from "remix";

export const action: ActionFunction = ({ request }) => {
  console.log(request);
  return new Response(JSON.stringify({ ok: true }));
};

const Action = () => {
  const fetcher = useFetcher();

  const handleClick = useCallback(async () => {
    const response = await fetcher.submit(new FormData(), {
      method: "post",
    });
    console.log(response);
  }, [fetcher]);

  return (
    <div>
      <h2>With Form</h2>
      <Form method="post">
        <button type="submit">Submit</button>
      </Form>
      <h2>Without Form</h2>
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};

export default Action;
