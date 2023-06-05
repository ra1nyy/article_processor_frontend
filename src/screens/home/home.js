import {Fragment} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return <Fragment>
        <div className="d-flex justify-content-center align-items-center h-exclude-header">
            <Row style={{width: '100%'}}>
                <Col sm={true}/>
                <Col sm={true}>
                    <h1 className={'text-center'}
                        style={{
                            fontWeight: 'bolder',
                            fontSize: '3em'
                        }}>
                        Article Processor
                    </h1>
                    <p>
                        Мы предлагаем автоматическое форматирование вашего документа и надежную проверку
                        на уникальность. Наш интуитивно понятный и легко используемый инструмент поможет вам создать
                        профессионально оформленные статьи в кратчайшие сроки.
                    </p>
                    <div className={'text-center'}>
                        <Button style={{width: "50%"}}
                                onClick={() => {
                                    navigate('/form')
                                }}>
                            Начать
                        </Button>
                    </div>
                </Col>
                <Col sm={true}/>
            </Row>
        </div>
    </Fragment>
}
