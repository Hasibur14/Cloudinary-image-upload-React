
import React from 'react';
import './imageUpload.css'

class ImageUpload extends React.Component {
    state = {
        imageUrl: null,
        imageAlt: null,
    }


    handleImageUpload = () => {
        // get the first input element with the type of file,
        const imageFile = document.querySelector('input[type="file"]')
        // destructure the files array from the resulting object
        const files = imageFile.files
        // log the result to the console
        console.log('Image file', files[0])
    }

    render() {
        const { imageUrl, imageAlt } = this.state;

        return (
            <main className="App ">
                <section className="left-side">
                    <form>
                        <div className="form-group">
                            <input type="file" />
                        </div>

                        <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
                        <button type="button" className="btn widget-btn">Upload Via Widget</button>
                    </form>
                </section>
                <section className="right-side">
                    <p>The resulting image will be displayed here</p>
                    {imageUrl && (
                        <img src={imageUrl} alt={imageAlt} className="displayed-image" />
                    )}
                </section>
            </main>
        );
    }
}

export default ImageUpload;
