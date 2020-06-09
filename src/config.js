export default {
    rootPath : 
        process.env.REACT_APP_STATE === "localhost" ? "https://kshop-server.herokuapp.com" 
            : "https://kshop-server.herokuapp.com"
};
