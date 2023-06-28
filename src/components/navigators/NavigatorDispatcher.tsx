import { useTheme } from "@mui/material";
import { Navigator, RouteType } from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

export const NavigatorDispatcher: React.FC<{routes: RouteType[]}> = ({routes}) => {
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('sm'))
    return !isPortrait ? <Navigator routes={routes} ></Navigator>: <NavigatorPortrait routes={routes}></NavigatorPortrait>
}