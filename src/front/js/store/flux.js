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
			  "https://ubiquitous-space-spoon-wrgxgpw7xv7cjv-3001.app.github.dev/api/register",
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
			  return { success: true, message: "Registration successful" };
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
			  "https://ubiquitous-space-spoon-wrgxgpw7xv7cjv-3001.app.github.dev/api/token",
			  opts
			);
			if (resp.status !== 200) {
			  alert("Thanks for Registering! Please login to continue.");
			  return false;
			}
  
			const data = await resp.json();
			console.log(" This came from the backend", data);
			sessionStorage.setItem("token", data.access_token);
			setStore({ token: data.access_token });
		  } catch (error) {
			console.log("Login Error", error);
		  }
		},
  
		getMessage: async () => {
		  const store = getStore();
		  const opts = {
			headers: {
			  Authorization: "Bearer " + store.token,
			},
		  };
		  try {
			// fetching data from the backend
			const resp = await fetch(
			  "https://ubiquitous-space-spoon-wrgxgpw7xv7cjv-3001.app.github.dev/api/hello",
			  opts
			);
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;
  