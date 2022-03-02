import { onMounted, ref } from '@vue/composition-api'

export const userHooks = (initName) => {
  const name = ref(initName)

  onMounted(() => {
    console.log('执行了')
  })

  const changeName = (arg) => {
    name.value = arg
  }

  return {
    name,
    changeName
  }
}
