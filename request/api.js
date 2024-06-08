/**   
 * api接口统一管理
 */
import { get, post } from './http'
export const login = p => post('student/login', p)