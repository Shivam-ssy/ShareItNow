
const config={
    server:String(import.meta.env.VITE_BACKEND_URL),
    loginUrl:String(import.meta.env.VITE_LOGIN_URL),
    registerUrl:String(import.meta.env.VITE_REGISTER_URL),
    db:String(import.meta.env.VITE_DB_URL),
    uploadUrl:String(import.meta.env.VITE_UPLOAD_URL),
    downloadUrl:String(import.meta.env.VITE_DOWNLOAD_URL),
    homeUrl:String(import.meta.env.VITE_HOME_URL),
    downloadPage:String(import.meta.env.VITE_DOWNLOAD_PAGE)
}
export default config