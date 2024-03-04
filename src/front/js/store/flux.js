const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userId: null,
      token: null,
      journals: [],
      user: null,
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
      getUser: async () => {
        const resp = await fetch(process.env.BACKEND_URL + "/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await resp.json();
        if (resp.status === 200) {
          console.log(data)
          setStore({ user: data.user });
          setStore({ userid: data.user.id });
          return true
        } else {
          setStore({ userId: null });
          return false
        }
        console.log("User ID", getStore().userId);
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
          return { success: true, message: data.message };
        } else {
          setStore({
            message: data.message || "An error occurred during registration",
          });
          return {
            success: false,
            message: data.message || "An error occurred during registration",
          };
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
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/login",
          opts
        );
        if (resp.status !== 200) {
          alert("Login Failed");
          return false;
        }

        const data = await resp.json();
        console.log(" This came from the backend", data);
        sessionStorage.setItem("token", data.token);
        setStore({ token: data.token });

        // Call getUser to set the userId in the store
        await getActions().getUser();

        return data;
      },

      submitJournal: async (journal) => {
        const token = getStore().token;
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(journal),
        };
        const resp = await fetch(
          process.env.BACKEND_URL + "/api/journal",
          opts
        );
        const data = await resp.json();
        if (resp.status === 200 || resp.status === 201) {
          return { success: true, message: data.message };
        } else {
          return { success: false, message: data.message };
        }
      },

      getJournal: async () => {
        const store = getStore();
        console.log("Store:", store); // Log the entire store

        const token = store.token;
        const userId = store.userId; // Get userId from the store

        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const url = `${process.env.BACKEND_URL}/api/journal/${userId}`; // Use userId in the URL
        const resp = await fetch(url, opts);

        if (resp.ok) {
          const data = await resp.json();
          setStore({ journals: data.journal_entries });
        }
      },
    },
  };
};

export default getState;