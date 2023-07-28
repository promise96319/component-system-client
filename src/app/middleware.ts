export function middleware(req: any) {
  console.log('req', req);
}

export const config = {
  matcher: '*'
};
