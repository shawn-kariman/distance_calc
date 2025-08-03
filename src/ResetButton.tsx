export interface IProps<T> {};

export const ResetButton = <T extends object>(props: IProps<T> & { children?: any }) => {
    
    const handleReset = ()=>{
        // 
    }

    const buttonStyle: object = {
    position: 'absolute',
    top:'9px',
    left:'9px', zIndex: 12
    }

    return <>
        <button style={ buttonStyle } onClick={handleReset} >Reset</button>
    </>
}
