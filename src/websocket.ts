

let wsCount = 0

const uniObj: any = getUni() // 为了能发布到npm上进行的骚操作

declare const uni: any; // Declare uni as a global variable

function getUni() {
    if (typeof uni === 'undefined') {
        console.log('不是UniApp运行环境');
        return undefined
    } else {
        console.log('是UniApp运行环境');
        return uni
    }
}

export class WKWebsocket {
    addr!: string
    ws!: WebSocket | any
    destory: boolean = false
    constructor(addr: string) {
        wsCount++
        this.addr = addr

        if(uniObj) {
           this.ws = uniObj.connectSocket({
                url: addr,
               
                complete: ()=> {
                    // eslint-disable-next-line no-empty-function
                } // TODO: 这里一定要写，不然会返回一个 Promise对象
            })
        }else{
            this.ws = new WebSocket(this.addr);
            this.ws.binaryType = 'arraybuffer';
        }
       
    }

    onopen(callback: () => void) {
        if (uniObj) {
            console.log("onSocketOpen....2")
            this.ws.onOpen(() => {
                console.log("onSocketOpen....3")
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback()
                }
            })
        } else {
            this.ws.onopen = () => {
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback()
                }
            }
        }
    }

    onmessage(callback: ((ev: MessageEvent) => any) | null) {
        if (uniObj) {
            this.ws.onMessage((e) => {
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback(e.data)
                }
            })
        } else {
            this.ws.onmessage = (e) => {
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback(e.data)
                }
            }
        }

    }

    onclose(callback: (e: CloseEvent) => void) {
        if (uniObj) {
            this.ws.onClose((params) => {
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback(params)
                }
            })
        } else {
            this.ws.onclose = (e) => {
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback(e)
                }
            }
        }

    }

    onerror(callback: (e: Event) => void) {
        if (uniObj) {
            this.ws.onError((e) => {
                if (callback) {
                    callback(e)
                }
            })
        } else {
            this.ws.onerror = (e) => {
                if (this.destory) {
                    return
                }
                if (callback) {
                    callback(e)
                }
            }
        }
    }

    send(data: any) {
        if (uniObj) {
            if(data instanceof Uint8Array) {
                this.ws.send({ data:data.buffer })
            }else {
                this.ws.send({ data })
            }
            
        } else {
            this.ws.send(data)
        }

    }

    close() {
        if (uniObj) {
            uniObj.closeSocket()
        } else {
            this.destory = true
            this.ws.close()
        }
    }
}