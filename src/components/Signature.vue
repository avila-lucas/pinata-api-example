<script>
import axios from "axios";

export default {
  name: "Signature",
  data() {
    return {
      msg: 'Write your Signature!',
      token: "<YOUR JWT TOKEN HERE>"
    }
  },
  methods: {
    undo() {
      console.log("🧹 Clearing pad")
      this.$refs.signaturePad.undoSignature();
    },
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    },
    async save() {
      const {isEmpty, data} = this.$refs.signaturePad.saveSignature();

      if (isEmpty) {
        alert("⚠️ Empty signature");
        return
      }
      console.log("⬆️ Saving data to IPFS")
      const blob = this.dataURLtoBlob(data);
      const file = new File([blob], "test", {type: blob.type});
      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios
          .post(url, formData, {
            maxBodyLength: 'Infinity',
            headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              'Authorization': `Bearer ${this.token}`
            }
          });
      console.log("#️⃣ Your IPFS hash: ", res.data.IpfsHash);
      console.log(`🖼️ Your image at: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`)
    }
  }
}
</script>

<template>
  <h1 style="color: white"> {{ msg }} </h1>
  <div class="signature-pad">
    <div id="pad">
      <VueSignaturePad width="500px" height="300px" ref="signaturePad" :options="{ penColor: 'white' }"/>
      <div style="margin: 10px">
        <button class="clear-button button" @click="undo">Clear</button>
        <button class="submit-button button" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

.signature-pad {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#pad {
  width: 500px;
  height: 300px;
  border: 2px solid rgb(255, 255, 255, .1);
}

.button {
  height: 45px;
  border: 0;
  width: auto;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.clear-button {
  background: -webkit-linear-gradient(left, #9d57c6, #e23569);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
}

.submit-button {
  background: -webkit-linear-gradient(left, #4e44ce, #35aee2);
  background-size: 200% 200%;
  animation: gradient-animation 4s ease infinite;
  margin-left: 10px;
}
</style>
