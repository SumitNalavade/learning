import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App'

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, queryClient } from "./Utils/QueryClient";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
