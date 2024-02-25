import {User} from "../User";

type OnRegister = (user: User) => void;

export interface registerProps {
    onExit: Function;
    onRegister: OnRegister;
    isOpen: boolean;
}