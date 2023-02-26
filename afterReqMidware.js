export default function afterRequestTime(req, res, next) {
  console.log('[after]',res.json());
  next();
}
