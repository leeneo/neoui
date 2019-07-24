    /**
     * 功能-用于Form表单批量图片的压缩和上传
     *Author:leeneo
     *Contact:leeneo@xingzhihen.com
     *posturl:上传图片的服务url
     *postFormID:要提交的form表单的id
     *fileInputName：要上传的图片关联input的name
     */
    
    function init(formId, fileInputName, limitSize, imgQt, postUrl) {
        console.log("Init");
        var f = document.getElementById(formId);
        var formData = new FormData(f);
        var imgFiles = formData.getAll(fileInputName);
        console.log("压缩前：" + imgFiles[0].name + imgFiles[0].size)
        formData.delete(fileInputName);
        var newFiles;
        photoCompress(imgFiles, imgQt, limitSize, function (base64Codes) {
            var bl = convertBase64UrlToBlob(base64Codes);
            formData.append(fileInputName, bl, "new_" + Date.parse(new Date().toString()) + ".jpg");
            newFiles = formData.getAll(fileInputName);
            console.log("压缩后：" + newFiles[0].name + newFiles[0].size);
            if (newFiles.length === imgFiles.length) {
                ajax(formData, postUrl);
                console.log('post');
            }
        });
    }

    function photoCompress(files, imgQt, limitSize, base64Codes) {
        var reader;
        for (var i = 0; i < files.length; i++) {
            if (files[i].size / 10 > limitSize) {
                reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function () {
                    var src = this.result;
                    canvasDataURL(src, imgQt, base64Codes);
                };
            }
        }
    }

    function canvasDataURL(path, imgQt, callback) {
        var img = new Image();
        img.src = path;
        img.onload = function () {
            var w = img.width,
                h = img.height,
                scale = w / h;
            w = imgQt.width || w;
            h = imgQt.height || (w / scale);
            var quality = 0.6;
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var anw = document.createAttribute("width");
            var anh = document.createAttribute("height");
            anw.nodeValue = w.toString();
            anh.nodeValue = h.toString();
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(img, 0, 0, w, h);
            if (imgQt.quality && imgQt.quality <= 1 && imgQt.quality > 0)
                quality = imgQt.quality;
            var base64 = canvas.toDataURL('image/jpeg', quality);
            console.log(base64)
            callback(base64);
        };
    }

    function convertBase64UrlToBlob(urlData) {
        var arr = urlData.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: mime
        });
    }

    function ajax(formData, postUrl) {
        var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
        xhr.open("post", postUrl, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = uploadComplete; //请求完成
        xhr.onerror = uploadFailed; //请求失败
        //xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
        xhr.upload.onloadstart = function () {
            // ot = new Date().getTime(); //设置上传开始时间
            // oloaded = 0; //设置上传开始时，以上传的文件大小为0
            console.log('onload');
        };
        xhr.send(formData); //开始上传，发送form数据
    }
    // 上传成功响应
    function uploadComplete(evt) {
        //服务断接收完文件返回的结果
        var data = JSON.parse(evt.target.responseText);
        if (data.value == "OK") {
            alert("上传成功！");
        } else {
            alert("上传失败！");
        }
    }
    //上传失败
    function uploadFailed(evt) {
        alert("上传失败！");
    }

    // 取消上传
    // function cancleUploadFile() {
    //     xhr.abort();
    // }
    // 上传进度实现方法，上传过程中会频繁调用该方法
    // function progressFunction(evt: any) {
    //     var progressBar = document.getElementById("progressBar");
    //     var percentageDiv = document.getElementById("percentage");
    //     // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
    //     if (evt.lengthComputable) { //
    //         progressBar.max = evt.total;
    //         progressBar.value = evt.loaded;
    //         percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
    //     }
    //     var time = document.getElementById("time");
    //     var nt = new Date().getTime(); //获取当前时间
    //     var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
    //     ot = new Date().getTime(); //重新赋值时间，用于下次计算
    //     var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
    //     oloaded = evt.loaded; //重新赋值已上传文件大小，用以下次计算
    //     //上传速度计算
    //     var speed = perload / pertime; //单位b/s
    //     var bspeed = speed;
    //     var units = 'b/s'; //单位名称
    //     if (speed / 1024 > 1) {
    //         speed = speed / 1024;
    //         units = 'k/s';
    //     }
    //     if (speed / 1024 > 1) {
    //         speed = speed / 1024;
    //         units = 'M/s';
    //     }
    //     speed = speed.toFixed(1);
    //     //剩余时间
    //     var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
    //     time.innerHTML = '，速度：' + speed + units + '，剩余时间：' + resttime + 's';
    //     if (bspeed === 0) time.innerHTML = '上传已取消';
    // }