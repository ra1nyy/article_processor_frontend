import {Fragment} from "react";
import {Table} from "react-bootstrap";

export const TableSheet = (props) => {

    const Thead = () => {
        let th = [];
        for (let key of Object.keys(props.labels)) {
            th.push(<th key={key}>{props.labels[key]}</th>)
        }
        return <thead><tr>{th}</tr></thead>;
    }

    const Tbody = () => {
        if (props.data) {
            let tr = [];
            for (let element of props.data) {
                let td = [];
                for (let key of Object.keys(props.labels)) {
                    let formatted = props.formatElement(key, element)
                    td.push(<th key={key}>{formatted}</th>)
                }
                tr.push(<tr key={`key-tbody-tr-${tr.length}`}>{td}</tr>)
            }
            return <tbody>{tr}</tbody>;
        }
    }

    return <Fragment>
        <Table striped={true} hover={true} bordered={true} size={'sm'}>
            <Thead/>
            <Tbody/>
        </Table>
    </Fragment>
}