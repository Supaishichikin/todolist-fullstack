/**
 * Context to handle page display according to the state of the side bar
 */

import { createContext } from "react";
import { SidebarContextInterface } from "../types/styleAndLayout";

const SidebarContext = createContext<SidebarContextInterface | null>(null);

export default SidebarContext;