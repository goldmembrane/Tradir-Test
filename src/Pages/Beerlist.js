import React from 'react'
import MaterialTable from 'material-table'

const Beerlist = () => {

    return (
        <div>
            <MaterialTable
            columns = {[
                {
                    title: 'BeerName',
                    field: 'name',
                },
                { title: 'Id', field: 'id' },
                { title: 'Abv', field: 'abv'},
                { title: 'Tagline', field: 'tagline'},
            ]}
            data = {query =>
            new Promise((resolve, reject) => {
                let url = 'https://api.punkapi.com/v2/beers'
                fetch(url)
                .then((response) => response.json())
                .then((result) => {
                    resolve({
                        data: result,
                        totalCount: result.length,
                    })
                })
            })}
            title = 'demo title'
            />
        </div>
    )
}

export default Beerlist

/*
function RemoteData() {
  return (
    <MaterialTable
      title="Remote Data Preview"
      columns={[
        {
          title: 'Avatar',
          field: 'avatar',
          render: rowData => (
            <img
              style={{ height: 36, borderRadius: '50%' }}
              src={rowData.avatar}
            />
          ),
        },
        { title: 'Id', field: 'id' },
        { title: 'First Name', field: 'first_name' },
        { title: 'Last Name', field: 'last_name' },
      ]}
      data={query =>
        new Promise((resolve, reject) => {
          let url = 'https://reqres.in/api/users?'
          url += 'per_page=' + query.pageSize
          url += '&page=' + (query.page + 1)
          fetch(url)
            .then(response => response.json())
            .then(result => {
              resolve({
                data: result.data,
                page: result.page - 1,
                totalCount: result.total,
              })
            })
        })
      }
    />
  )
}
*/

/*
function FrenchTable() {
    return (
        <MaterialTable
            title="Visualisation du tableau en Français"
            columns={[
                { title: 'Prénom', field: 'name' },
                { title: 'Nom', field: 'surname' },
                {
                    title: 'Date de naissance',
                    field: 'birthYear',
                    type: 'numeric'
                },
                {
                    title: 'Ville de naissance',
                    field: 'birthCity',
                    lookup: { 34: 'Istanbul', 63: 'Sanliurfa' }
                }
            ]}
            data={[
                {
                    name: 'Mehmet',
                    surname: 'Baran',
                    birthYear: 1987,
                    birthCity: 63
                },
                {
                    name: 'Zerya Betül',
                    surname: 'Baran',
                    birthYear: 2017,
                    birthCity: 34
                }
            ]}
            localization={{
                body: {
                    emptyDataSourceMessage: "Pas d'enregistreent à afficher",
                    addTooltip: 'Ajouter',
                    deleteTooltip: 'Supprimer',
                    editTooltip: 'Editer',
                    filterRow: {
                        filterTooltip: 'Filtrer'
                    },
                    editRow: {
                        deleteText: 'Voulez-vous supprimer cette ligne?',
                        cancelTooltip: 'Annuler',
                        saveTooltip: 'Enregistrer'
                    }
                },
                grouping: {
                    placeholder: "Tirer l'entête ...",
                    groupedBy: 'Grouper par:'
                },
                header: {
                    actions: 'Actions'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'lignes',
                    labelRowsPerPage: 'lignes par page:',
                    firstAriaLabel: 'Première page',
                    firstTooltip: 'Première page',
                    previousAriaLabel: 'Page précédente',
                    previousTooltip: 'Page précédente',
                    nextAriaLabel: 'Page suivante',
                    nextTooltip: 'Page suivante',
                    lastAriaLabel: 'Dernière page',
                    lastTooltip: 'Dernière page'
                },
                toolbar: {
                    addRemoveColumns: 'Ajouter ou supprimer des colonnes',
                    nRowsSelected: '{0} ligne(s) sélectionée(s)',
                    showColumnsTitle: 'Voir les colonnes',
                    showColumnsAriaLabel: 'Voir les colonnes',
                    exportTitle: 'Exporter',
                    exportAriaLabel: 'Exporter',
                    exportName: 'Exporter en CSV',
                    searchTooltip: 'Chercher',
                    searchPlaceholder: 'Chercher'
                }
            }}
        />
    );
}
*/