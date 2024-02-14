const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined) {
          setStore({ token: token });
        }
      },

      register: async (email, password) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/register",
            opts
          );
          const data = await resp.json();
          if (resp.status === 409) {
            setStore({ message: "Email or username already in use" });
            return {
              success: false,
              message: "Email or username already in use",
            };
          } else if (resp.status === 200 || resp.status === 201) {
            sessionStorage.setItem("token", data.access_token);
            setStore({ token: data.access_token });
            return { success: true, message: data.message }; // Use the server's message
          } else {
            setStore({
              message: data.message || "An error occurred during registration",
            });
            return {
              success: false,
              message: data.message || "An error occurred during registration",
            };
          }
        } catch (error) {
          console.log("Registration Error", error);
          return { success: false, message: "An unexpected error occurred" };
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("logout");
        setStore({ token: null });
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            opts
          );
          if (resp.status !== 200) {
            alert("Thanks for Registering! Please login to continue.");
            return false;
          }

          const data = await resp.json();
          console.log(" This came from the backend", data);
          sessionStorage.setItem("token", data.token); // Changed from data.access_token to data.token
          setStore({ token: data.token }); // Changed from data.access_token to data.token
          return data; // Added this line
        } catch (error) {
          console.log("Login Error", error);
        }
      },
    },
  };
};

export default getState;
