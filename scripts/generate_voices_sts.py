import os
import argparse
import requests

# ==============================================================================
# CONFIGURAÇÕES DA API NATIVA DA ELEVENLABS (SPEECH-TO-SPEECH)
# ==============================================================================
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "SUA_API_KEY_ELEVENLABS_AQUI")

# Modelo de Speech-to-Speech
# - "eleven_multilingual_v2": Mantém a emoção, o ritmo, e a entonação da sua gravação original.
MODEL_ID = "eleven_multilingual_v2"

# IDs das vozes oficiais da ElevenLabs
ELEVENLABS_VOICES = {
    "narrator": "pNInz6obpgqjVWtJ45ng",  # Marcus - Voz narrativa profunda e clássica
    "ishaan": "EXAVITQu4vr4xnSDxMaL",    # Gigi/Bella - Voz infantil com alta carga emocional
    "nikumbh": "AZnzlk1XvdvUeBnXmlld",   # Domi - Voz calorosa, entusiasmada e encorajadora
    "strict": "N2l5iaCqiJD14Kx8yTWv",    # George - Voz severa, ríspida
    "father": "ODq5zmih86Wj9AD6Hn65",    # Arnold - Voz masculina forte e firme
    "brother": "IKne3meq5aBk9saAMt7s",   # Charlie - Voz jovem adolescente
    "principal": "VR6AupYg3I4dm5v3vs9f", # Bill - Voz de senhor, formal
    "rajan": "bV5qZ46g2G0oT5eT4U4c",     # Liam - Voz jovem e amigável
}

def convert_speech_to_speech(input_audio_path, speaker, output_audio_path):
    """Converte o áudio gravado por você para a voz do personagem selecionado."""
    if ELEVENLABS_API_KEY == "SUA_API_KEY_ELEVENLABS_AQUI":
        raise ValueError("Chave de API da ElevenLabs não configurada no script ou no ambiente.")
        
    voice_id = ELEVENLABS_VOICES.get(speaker)
    if not voice_id:
        raise ValueError(f"Personagem '{speaker}' não encontrado no dicionário de vozes.")
        
    url = f"https://api.elevenlabs.io/v1/speech-to-speech/{voice_id}"
    
    headers = {
        "xi-api-key": ELEVENLABS_API_KEY
    }
    
    # Parâmetros de voz configurados para máxima fidelidade ao acting/interpretação do usuário
    data = {
        "model_id": MODEL_ID,
        "voice_settings": {
            "stability": 0.40,          # Permite flexibilidade de tom e oscilação emocional
            "similarity_boost": 0.85,   # Alta similaridade para manter o timbre do personagem da ElevenLabs
            "style": 0.10,
            "use_speaker_boost": True
        }
    }
    
    # Abre o arquivo de áudio original do usuário
    if not os.path.exists(input_audio_path):
        raise FileNotFoundError(f"Arquivo de áudio de entrada não encontrado: {input_audio_path}")
        
    print(f"Lendo áudio de entrada: {input_audio_path}...")
    
    with open(input_audio_path, "rb") as audio_file:
        files = {
            "audio": (os.path.basename(input_audio_path), audio_file, "audio/mpeg")
        }
        
        # A API de Speech-to-Speech no ElevenLabs espera dados de voz e modelo via formulário multipart
        payload = {
            "model_id": (None, data["model_id"]),
            "voice_settings": (None, str(data["voice_settings"]).replace("'", '"').replace("True", "true"))
        }
        
        print(f"Enviando para ElevenLabs Speech-to-Speech (Voz: {speaker})...")
        response = requests.post(url, headers=headers, files=files, data=payload)
        
        if response.status_code == 200:
            with open(output_audio_path, "wb") as out_file:
                out_file.write(response.content)
            print(f"[Sucesso] Áudio convertido salvo em: {output_audio_path}")
            return True
        else:
            print(f"[Falha] Erro na conversão ({response.status_code}): {response.text}")
            return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Conversão de Voz Speech-to-Speech da ElevenLabs")
    parser.add_argument("--input", "-i", required=True, help="Caminho para o arquivo gravado por você (.wav ou .mp3)")
    parser.add_argument("--speaker", "-s", required=True, choices=list(ELEVENLABS_VOICES.keys()), help="O personagem destino")
    parser.add_argument("--output", "-o", required=True, help="Caminho de saída para salvar o áudio final do personagem")
    
    args = parser.parse_args()
    convert_speech_to_speech(args.input, args.speaker, args.output)
