import {Fragment} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useFormik} from "formik";
import {Input} from "../../components/forms/fields";
import {loginSubmit} from "../../actions/auth";

export const Login = () => {
    const form = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => handleSubmit(values),
    });

    const handleSubmit = (values) => {
        loginSubmit(values).then(r => {
        }).catch(r => {
        });
    }

    return <Fragment>
        <div className="d-flex justify-content-center align-items-center h-exclude-header">
            <Row style={{width: '100%'}}>
                <Col sm={true}/>
                <Col sm={true}>
                    <h1 className={'text-center'}>
                        Вход
                    </h1>
                    <Form>
                        <Input value={form.values.username}
                               name={'username'}
                               className={'mb-3'}
                               onChange={form.handleChange}
                               label={'Логин'}
                        />
                        <Input value={form.values.password}
                               name={'password'}
                               type={'password'}
                               className={'mb-4'}
                               onChange={form.handleChange}
                               label={'Пароль'}
                        />
                        <Button style={{width: '100%'}} onClick={form.submitForm}>
                            Войти
                        </Button>
                    </Form>
                    <hr/>
                </Col>
                <Col sm={true}/>
            </Row>
        </div>
    </Fragment>
}
