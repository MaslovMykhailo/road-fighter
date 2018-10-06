export default (...args) => {
  return () => {
    args.forEach(f => f());
  }
}