import * as React from 'react'
import MenuItem from "./MenuItem";

class Navigation extends React.Component<any,any>{

    public render() {
        return (
            <nav>
                <MenuItem/>
            </nav>
        );
    }
}

export default Navigation;