import React, {Component} from 'react';
import styled from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
    faItalic, faStrikethrough,
    faUnderline
} from "@fortawesome/free-solid-svg-icons";
import {BeautyInputOutlined} from "./BeautyComponent";


const TextField = styled('div')`
  width: 100%;
  min-height: 300px;
  background-color: white;
  position: relative;
  white-space: pre-wrap;      /* CSS3 */   
   white-space: -moz-pre-wrap; /* Firefox */    
   white-space: -o-pre-wrap;   /* Opera 7 */    
   word-wrap: break-word;      /* IE */
`

const FontEditorWrapper = styled('div')`
box-sizing: border-box;
width: 100%;
display: flex;
padding: 5px;
${'button'}{
    white-space: nowrap;
    margin-left: 50px;
    box-sizing: border-box;
    font-weight: bold;
    @media (max-width: 900px){
    margin-left: 10px;
    }
}

`

const AllWrapper = styled('div')`
width: 100%;
height: 100%;
`

class TextEditor extends Component {
    state = {
        fontSize:"",
    }

    command = (e,name,size) => {
        let success;
        if(name === 'fontSize'){
            try {
                success = document.execCommand(name, false, size);
            } catch (error) {
                alert(error);
            }
        }
        else{
            try {
                success = document.execCommand(name, false, null);
            } catch (error) {
                alert(error);
            }
        }

        if (!success) {
            const supported = this.isSupported(name);
            const message = supported ? 'Unknown error. Is anything selected?' : 'Command is not supported by your browser.';
            alert(message);
        }
    }

    isSupported = (name) => {
        return document.queryCommandSupported(name);
    }

    observer = (mutations) => {
        mutations.forEach(this.checkMutation);
    }

    checkMutation = (mutation) => {
        const editor = document.querySelector('.editor').innerHTML;
        this.props.updateContent(editor);
    }

    componentDidMount(){
        const editor = document.querySelector('.editor');
        editor.contentEditable = true;

        let observer = new MutationObserver(this.observer);

        let config = {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
        };

        observer.observe(editor, config);
    }

    dataChange(event){
        this.setState({[event.target.name]:event.target.value });
    }

    getAttribute = (mutation) => {
        return mutation.target.parentElement && mutation.target.parentElement.attributes[0] && mutation.target.parentElement.attributes[0].value;
    }


    render(){
        return(
            <AllWrapper style={{fontWeight:"normal"}}>
                <div style={{textAlign:"center"}}>
                    <button onClick={((e) => this.command(e, 'bold',null))}>
                        <FontAwesomeIcon icon={faBold}/>
                    </button>
                    <button onClick={((e) => this.command(e, 'italic',null))}>
                        <FontAwesomeIcon icon={faItalic}/>
                    </button>
                    <button onClick={((e) => this.command(e, 'underline',null))}>
                        <FontAwesomeIcon icon={faUnderline}/>
                    </button>

                    <button onClick={((e) => this.command(e, 'justifyCenter',null))}>
                        <FontAwesomeIcon icon={faAlignCenter}/>
                    </button>
                    <button onClick={((e) => this.command(e, 'justifyLeft',null))}>
                        <FontAwesomeIcon icon={faAlignLeft}/>
                    </button>
                    <button onClick={((e) => this.command(e, 'justifyRight',null))}>
                        <FontAwesomeIcon icon={faAlignRight}/>
                    </button>
                    <button onClick={((e) => this.command(e, 'strikeThrough',null))}>
                        <FontAwesomeIcon icon={faStrikethrough}/>
                    </button>
                </div>
                <FontEditorWrapper>
                    <BeautyInputOutlined type="number" name="fontSize" onChange={(event)=>this.dataChange(event)} placeholder={"Font size"}/>
                    <button onClick={((e) => this.command(e, 'fontSize',this.state.fontSize))}>Change Font Size</button>
                </FontEditorWrapper>
                <TextField className='editor' dangerouslySetInnerHTML={ {__html: this.props.content}}/>

            </AllWrapper>

        )
    }
}

export default TextEditor;