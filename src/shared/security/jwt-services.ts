export interface JwtService {
    sign(payload: object): string
    signRefresh(payload: object): string
    verify<T extends object>(token: string): T
    verifyRefresh<T extends object>(token: string): T
}
