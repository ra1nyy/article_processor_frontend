import {AuthContext} from "../../auth";
import {useContext, useEffect, useState} from "react";
import axiosInstance, {protectedAxios} from "../../utils/axiosAPI";
import {TableSheet} from "../../components/table/table";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const labels = {
    id: 'ID',
    title_rus: 'Название статьи',
    scientific_adviser_institute: 'Институт',
    scientific_adviser_department: 'Кафедра',
    scientific_adviser_fullname: 'ФИО Руководителя',
    authors: 'Авторы статьи',
    attached_docs_id: 'Загруженный файл',
    formatted_docs_id: 'Отформатированный файл'

}

export const Articles = () => {
    const {user, setUser} = useContext(AuthContext);
    const [articles, setArticles] = useState(null);
    const [article_type, setArticleType] = useState('my');

    useEffect(() => {
        if (!articles) {
            protectedAxios(axiosInstance.get, '/article/my').then(r => {
                if (r.status === 200)
                    setArticles(r.data)
            })
        }
    }, [articles])

    useEffect(() => {
        protectedAxios(axiosInstance.get, `/article${article_type === 'my' ? '/my' : ''}`).then(r => {
            if (r.status === 200)
                setArticles(r.data)
        })
    }, [article_type])

    const downloadFile = (file_id) => {
        protectedAxios(axiosInstance.get, `/file/${file_id}`, {responseType: 'blob'}).then(r => {
            console.log(r)
            const href = URL.createObjectURL(r.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${(Math.random() + 1).toString(36).substring(7)}.doc`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }

    const formatElement = (key, element) => {
        switch (key) {
            case 'authors':
                if (element?.[key]?.length)
                    return element?.[key]?.map((v) => <li>{`${v?.last_name} ${v?.first_name} ${v?.surname}`}</li>)
                else return '(не задано)'
            case 'attached_docs_id':
            case 'formatted_docs_id':
                return element?.[key] ?
                    <Link to={'#'} onClick={() => downloadFile(element?.[key])}>Скачать файл</Link> : '(не задано)'
            default:
                return element?.[key] ? element?.[key] : '(не задано)'


        }
    }

    return <Container>
        <h1 className={'mt-4'}>
            Статьи
        </h1>
        <hr/>
        {user && user.role === 'admin'
            ? <ButtonGroup className={'mb-3'}>
                <Button variant={article_type === 'my' ? 'primary' : 'outline-primary'}
                        onClick={() => setArticleType('my')}>
                    Мои статьи
                </Button>
                <Button variant={article_type !== 'my' ? 'primary' : 'outline-primary'}
                        onClick={() => setArticleType('all')}>
                    Все статьи
                </Button>
            </ButtonGroup>
            : null}
        <TableSheet labels={labels} data={articles} formatElement={formatElement}/>
    </Container>
}