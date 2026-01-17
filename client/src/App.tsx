import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RecyclersList from "@/pages/recyclers-list";
import RecyclerDetail from "@/pages/recycler-detail";
import JoinRecycler from "@/pages/join-recycler";
import JoinWastePicker from "@/pages/join-waste-picker";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/recyclers" component={RecyclersList} />
      <Route path="/recyclers/:id" component={RecyclerDetail} />
      <Route path="/join/recycler" component={JoinRecycler} />
      <Route path="/join/waste-picker" component={JoinWastePicker} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
