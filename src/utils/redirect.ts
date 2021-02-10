const redirect = (url: string) => {
  return {
    redirect: {
      destination: url,
      permanent: false,
    },
  }
}

export { redirect }
