import React, { useState, useEffect } from 'react';

import listOSRequestManager from '../../../dispatcher/listOSRequest';
import ListFactory from './listFactory';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationRed } from "../../../assets/values/styles";

const tokenManager = require('../../../dispatcher/tokenManager');

/**
 * @function Components-Painel-logout
 * @description Componente que define as configurações da tabela de OS's
 */
function App(props) {

    /** const que recebe a propriedade "breakOfPages" do componente, esta propriedade armazena o número de linhas que a tabela vai ter. */
    const breakOfPages = props.breakOfPages;

    /** const que recebe a propriedade "filterType" do componente, esta propriedade armazena o tipo de filtro que irá ser usado para selecionar as OS's presentes na tabela. */
    const filterType = props.filterType;

    let tmpDado;
    if (!props.filterData) tmpDado = "";
    else tmpDado = props.filterData;

    /** const que armazena o valor referente ao dado que ira ser utilizado na filtragem de OS's presentes na tabela. */
    const dado = tmpDado;

    /** const que recebe a propriedade "tableColumn" do componente, esta propriedade armazena um array com as colinas presentes na tabela. */
    const tableColumn = props.tableColumn;

    let nullListItens = {
        service_order_id: "",
        senha: "",
        owner_name: "",
        device_name: "",
        delivery_date: "",
        completion_date: "",
        status: "",
        service_value: ""
    }
    let initListItens = [];

    for (let i = 0; i < breakOfPages; i++) initListItens[i] = nullListItens;

    /** const useState para os valores da tabela. */
    const [listItens, setListItens] = useState(initListItens)

    /** const useState que indica a pagina atual da tabela. */
    const [currentPage, setCurrentPage] = useState(1);

    /** const useState que indica a quantidade de paginas tem a tabela. */
    const [pages, setPages] = useState([]);

    /** Esta arrow function obtém a informações da OS pela API e insere elas na tabela. */
    const listarOS = () => {
        var urlParams = new URLSearchParams({ filterType: filterType, break: breakOfPages, dado: dado });

        listOSRequestManager(currentPage, urlParams, { headers: { authentication: "Bearer " + tokenManager.readToken() } }).then(res => {
            setListItens(res.data.liste);

            let newPages = []

            for (let i = 1; i <= res.data.numberOfPages; i++) newPages[i] = i;


            setPages(newPages);
        });
    }

    /** Esta arrow function altera a página da tabela. */
    const changeThePage = e => { setCurrentPage(parseInt(e.target.innerText)); }

    /** useEffect para a inserção de dados na tabela = é executado quando o valor dentro de currentPage é definido ou redefinido, quando isso acontece as informações da tabela são atualizadas. */
    useEffect(() => { listarOS(); }, [currentPage]);

    return (
        <PaginationRed>
            <ListFactory {...({ listItens, tableColumn })} />

            <Pagination aria-label="Page navigation example">

                {pages.map(item => (
                    <PaginationItem active={item == currentPage && true} onClick={changeThePage}>
                        <PaginationLink>
                            {item}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </Pagination>

        </PaginationRed>
    );
}

export default App;