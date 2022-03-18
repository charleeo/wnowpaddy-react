import { makeStyles } from '@material-ui/core/styles';
export const useStyles =()=>{
    const styles = makeStyles((theme) => ({

        toolbar: {
        //   borderBottom: `3px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent : "space-between",
        },
        toolbarTitle: {
          fontSize :"2rem",
          textTransform : "uppercase"
        },
        toolbarSecondary: {
          justifyContent: 'space-between',
          overflowX: 'auto',
        },
        toolbarLink: {
          padding: theme.spacing(0.5),
          flexShrink: 0,
        },
      
        searchField :{
         display : "none"
        },

        actionIcons:{
          cursor:"pointer"
        },
      
        '@media (max-width: 480px)' : {
          toolbar:{
            
          },
      
          toolbarTitle: {
            fontSize :"1.5rem",
      
          },
        },
        
      }));
      return styles
}

