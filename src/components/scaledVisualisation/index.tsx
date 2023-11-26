import Visualisation from "../sites/editor/Visualisation";



export default function ScaledVisualisation({data, mode, width, height} : {data: any, mode: string, width?: string, height?: string}) {

    const WIDTH = width || '150vw';
    const HALF_WIDTH = `calc(${WIDTH} * 0.5)`
    const HEIGHT = height || '150vh';
    const HALF_HEIGHT = `calc(${HEIGHT} * 0.5)`

    return(
    <div style={{ background: 'cyan', width: HALF_WIDTH, height: HALF_HEIGHT, maxWidth: '80vw'}}>
        <div style={{
            // position: 'absolute',
            background: 'red', 
            transform:'scale(0.5) translateX(-50%) translateY(-50%)', 
            width: WIDTH, 
            height: HEIGHT,
            overflowY: 'scroll',
        }}>
            <div style={{
                // transform: 'scale(0.5) translateY(-50%) translateX(0%)',
                // width: '100%',
                // width: '0',
                // height: '0',
                // overflowY: 'scroll',
            }}>
                <Visualisation data={data} mode={mode} />
            </div>
        </div>
    </div>
    )
}