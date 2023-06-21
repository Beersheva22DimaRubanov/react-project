import Row from "./Row"

export const Matrix: React.FC<{matrix: number[][]}> = ({matrix})=>{
    function getRows(){
        return matrix.map((row, index) => <Row row={row} key = {index}></Row>)
    }
    return <section style= {{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {getRows()}
    </section>
}