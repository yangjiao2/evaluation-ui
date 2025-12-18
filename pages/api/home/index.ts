try {
  const origin =
      typeof window !== 'undefined' && window.location.origin
          ? window.location.origin
          : '';

  // console.log('hit /api/home route', {origin})
}
catch (error){
  // console.log('error fromm /api/home', error)
}
export { default, getServerSideProps } from '../../home';
