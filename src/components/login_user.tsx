const LoginUser = ({ isLoggedin, onLogin }: LoginUserProps) => {
    return (
        <div>
            <div></div>
        </div>
    );
};
interface LoginUserProps {
    isLoggedin: boolean;
    onLogin: (val: boolean) => void;
}

export default LoginUser;
