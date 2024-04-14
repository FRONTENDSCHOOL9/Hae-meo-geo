import router from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>로딩중...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
