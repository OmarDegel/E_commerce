export const apiUrl = "http://127.0.0.1:8000/api";
export default function adminToken() {
  const adminData = localStorage.getItem("admin");


    const admin = JSON.parse(adminData); 
    const token = admin.token;

return token;
  
}
