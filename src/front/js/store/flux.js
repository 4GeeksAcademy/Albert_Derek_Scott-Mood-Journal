const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userId: null,
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

      getUser: async () => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/user/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getStore().token}`,
              },
            }
          );
          const data = await resp.json();
          if (resp.status === 200) {
            setStore({ userId: data.id });
          } else {
            setStore({ userId: null });
          }
        } catch (error) {
          console.log("Error getting user", error);
          setStore({ userId: null });
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
        } catch (error) {
          console.log("Login Error", error);
        }
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
        try {
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
        } catch (error) {
          console.log("Journal Submission Error", error);
          return { success: false, message: "An unexpected error occurred" };
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
        try {
          const url = `${process.env.BACKEND_URL}api/journal/${userId}`; // Use userId in the URL
          const resp = await fetch(url, opts);

          if (resp.ok) {
            const data = await resp.json();
            return Array.isArray(data) ? data : [data];
          } else {
            console.error("Error fetching journals:", resp.statusText);
          }
        } catch (error) {
          console.error("Error fetching journals:", error);
        }
      },
    },
  };
};

export default getState;
