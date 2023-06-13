import {AuthContext} from "../../auth";
import {Fragment, useContext, useEffect, useState} from "react";
import axiosInstance, {protectedAxios} from "../../utils/axiosAPI";
import {TableSheet} from "../../components/table/table";
import {Button, ButtonGroup, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as XLSX from 'xlsx/xlsx.mjs';
import {delete_cols, format_excel} from "../../utils/excel";

const labels = {
    title_rus: 'Название статьи',
    authors: 'Авторы статьи',
    authors_works: 'Место работы или учебы',
    authors_groups: 'Группа',
    authors_emails: 'Почта',
    authors_urls: 'Ссылка на профиль',
    scientific_adviser_fullname: 'ФИО Руководителя',
    scientific_adviser_academic_degree: 'Ученая степень',
    scientific_adviser_academic_title: 'Ученая звание',
    scientific_adviser_institute: 'Институт',
    scientific_adviser_department: 'Кафедра',
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

    const downloadFile = (file_id, name) => {
        protectedAxios(axiosInstance.get, `/file/${file_id}`, {responseType: 'blob'}).then(r => {
            console.log(r)
            const href = URL.createObjectURL(r.data);

            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${name}.docx`);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }

    const downloadPage = () => {
        let data = document.getElementById('tblToExcl');
        let excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
        let ws = excelFile.Sheets["sheet1"];
        delete_cols(ws, 11, 2);
        format_excel(ws);
        XLSX.write(excelFile, {bookType: 'xlsx', bookSST: true, type: 'base64'});
        XLSX.writeFile(excelFile, `Cтатьи.xlsx`);
    }

    const formatElement = (key, element) => {
        switch (key) {
            case 'authors':
                if (element?.[key]?.length)
                    return element?.[key]?.map((v) => <div>{`${v?.last_name} ${v?.first_name} ${v?.surname}`}</div>)
                else return '(не задано)'
            case 'authors_works':
                if (element?.['authors']?.length)
                    return element?.['authors']?.map((v) => <div>{`${v?.place_of_work}`}</div>)
                else return '(не задано)'
            case 'authors_groups':
                if (element?.['authors']?.length)
                    return element?.['authors']?.map((v) => <div>{`${v?.study_group_number}`}</div>)
                else return '(не задано)'
            case 'authors_emails':
                if (element?.['authors']?.length)
                    return element?.['authors']?.map((v) => <div>{`${v?.email}`}</div>)
                else return '(не задано)'
            case 'authors_urls':
                if (element?.['authors']?.length)
                    return element?.['authors']?.map((v) => <div>{`${v?.social_network_url}`}</div>)
                else return '(не задано)'
            case 'attached_docs_id':
            case 'formatted_docs_id':
                return element?.[key] ?
                    <Link to={'#'} onClick={() => downloadFile(element?.[key],
                        element?.['authors']?.map((v) => v?.last_name).join('_') + '_Статья'
                    )}>Скачать файл
                    </Link> : '(не задано)'
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
            ? <Fragment>
                <ButtonGroup className={'mb-3'}>
                    <Button variant={article_type === 'my' ? 'primary' : 'outline-primary'}
                            onClick={() => setArticleType('my')}>
                        Мои статьи
                    </Button>
                    <Button variant={article_type !== 'my' ? 'primary' : 'outline-primary'}
                            onClick={() => setArticleType('all')}>
                        Все статьи
                    </Button>
                    <Button variant={'success'} onClick={() => downloadPage()}>Скачать таблицу</Button>
                </ButtonGroup>
            </Fragment>
            : null}
        <div className="kv-grid-container" style={{overflow: 'auto'}}>
            <TableSheet labels={labels} data={articles} formatElement={formatElement} id={'tblToExcl'}/>
        </div>
    </Container>
}