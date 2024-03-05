import { ThemeProvider } from '@emotion/react'
import { createTheme, Pagination } from '@mui/material'
import { dark } from '@mui/material/styles/createPalette'
import React from 'react'

const darkTheme = createTheme({
    palette: {
        theme: dark
    }
})

const CustomPagination = ({ setPage, numOfPages = 10 }) => {

    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0, 0);
    }


    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 10,
        }}>
            <ThemeProvider theme={darkTheme}>
                <Pagination count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)}
                    hideNextButton
                    hidePrevButton
                    color='primary'
                />

            </ThemeProvider>
        </div>
    )
}

export default CustomPagination