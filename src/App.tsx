import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import PageLayout from "./layout/PageLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";
import { Stats } from "./pages/stats/Stats";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/stats", element: <Stats /> },
];

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route
                key={"public-" + index}
                path={route.path}
                element={[<PageLayout key={index}>{route.element}</PageLayout>]}
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
